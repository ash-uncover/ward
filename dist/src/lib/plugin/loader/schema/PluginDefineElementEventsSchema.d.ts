export declare const PluginDefineElementEventsSchema: {
    $id: string;
    title: string;
    description: string;
    type: string;
    patternProperties: {
        '^.*$': {
            description: string;
            type: string;
        };
    };
    additionalProperties: boolean;
};
