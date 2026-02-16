import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/graphql/queries.ts"],
  generates: {
    "src/graphql/gen/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },

    "src/graphql/gen/hooks.ts": {
      preset: "import-types",
      plugins: ["typescript-react-apollo"],
      presetConfig: {
        typesPath: "./types",
        gqlTagName: "gql",
      },
    },
  },
  hooks: {
    afterOneFileWrite: [
      "node -e \"const fs=require('fs');const f=process.argv[1];let c=fs.readFileSync(f,'utf8');c=c.replace(/\\/\\/ @ts-ignore/g,'// @ts-expect-error duplicate');fs.writeFileSync(f,c);\"",
    ],
  },
  ignoreNoDocuments: true,
};

export default config;
