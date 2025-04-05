export declare const PluginSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    properties: {
        name: {
            description: string;
            type: string;
        };
        url: {
            description: string;
            type: string;
        };
        dependencies: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            minItems: number;
            uniqueItems: boolean;
        };
        defines: {
            $ref: string;
        };
        provides: {
            description: string;
            type: string;
            patternProperties: {
                '^.*$': {
                    $ref: string;
                };
            };
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export default PluginSchema;
