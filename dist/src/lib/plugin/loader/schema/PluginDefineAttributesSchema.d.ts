export declare const PluginDefineAttributesSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    patternProperties: {
        '^.*$': {
            description: string;
            type: string;
            enum: string[];
        };
    };
    additionalProperties: boolean;
};
