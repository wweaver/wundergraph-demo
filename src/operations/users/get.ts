import fetch from "node-fetch";
import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.query({
    input: z.object({
        id: z.string(),
    }),
    handler: async ({input}) => {
        const resp = await fetch(
            process.env.TEST_HOST + '/foo',
            {method: 'POST', body: '{"foo": "bar"}'}
        );

        return {status: resp.status === 200}
    },
});
