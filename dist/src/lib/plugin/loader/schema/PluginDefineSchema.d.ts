export declare const PluginDefineSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    properties: {
        properties: {
            $ref: string;
        };
        attributes: {
            $ref: string;
        };
        elements: {
            $ref: string;
        };
    };
    additionalProperties: boolean;
};
