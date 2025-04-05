export declare const PluginProvideElementSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    properties: {
        url: {
            type: string;
        };
        type: {
            type: string;
            enum: string[];
        };
        element: {
            type: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
