import { inject } from "envkist/internal/deno";
import { accessor } from "envkist/internal/modules/deno/inject";

import { testInject } from "#/helpers/inject";

testInject({
    label: "deno",
    accessor,
    inject,
});
