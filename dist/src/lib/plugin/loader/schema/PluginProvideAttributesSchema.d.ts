export declare const PluginProvideAttributesSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    patternProperties: {
        '^.*$': {
            description: string;
            oneOf: ({
                type: string[];
                items?: undefined;
            } | {
                type: string;
                items: {
                    type: string;
                };
            })[];
        };
    };
    additionalProperties: boolean;
};
