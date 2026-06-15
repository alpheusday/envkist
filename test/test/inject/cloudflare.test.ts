import { inject } from "envkist/internal/cloudflare";
import { accessor } from "envkist/internal/modules/cloudflare/inject";

import { testInject } from "#/helpers/inject";

testInject({
    label: "cloudflare",
    accessor,
    inject,
});
