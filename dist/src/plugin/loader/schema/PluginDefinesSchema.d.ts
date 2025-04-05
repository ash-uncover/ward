export declare const PluginDefinesSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    patternProperties: {
        '^.*$': {
            $ref: string;
        };
    };
    additionalProperties: boolean;
};
