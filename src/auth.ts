import {
  defaultFieldResolver, GraphQLSchema,
} from "graphql";
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';

export function authDirective() {
  const typeDirectiveArgumentMaps: Record<string, any> = {}
  return {
    authDirectiveTypeDefs: `directive @auth on OBJECT | FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: type => {
          const authDirective = getDirective(schema, type, "auth")?.[0]
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective
          }
          return undefined
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, "auth")?.[0]??
            typeDirectiveArgumentMaps[typeName]
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig
            fieldConfig.resolve = function (source, args, context, info) {
              const user = context.user;
              if (!user) {
                throw new Error("not authenticated");
              }
              return resolve(source, args, context, info)
            }
            return fieldConfig
          }
        }
      })
  }
}


