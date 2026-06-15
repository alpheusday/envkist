import { createInject } from "envkist/internal/functions/inject";

import { testInject } from "#/helpers/inject";

const customAccessor = (name: string): string => `custom.${name}`;

testInject({
    label: "custom",
    accessor: customAccessor,
    inject: createInject(customAccessor),
});
