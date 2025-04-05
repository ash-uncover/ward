export declare const PluginDefineElementSchema: {
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
        events: {
            $ref: string;
        };
    };
    additionalProperties: boolean;
};
