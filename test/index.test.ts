import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { TestServers } from "@wundergraph/sdk/testing";
import fetch from "node-fetch";
import { join } from "path";
import { createTestAndMockServer } from '../src/generated/testing';

let ts: TestServers;

beforeAll(async () => {
    ts = createTestAndMockServer({dir: join(__dirname, '..'), fetch: fetch as any})
    await ts.start({mockURLEnvs: ['TEST_HOST']});
});

afterAll(async () => {
    await ts.mockServer.stop()
    await ts.testServer.stop();
});

describe('users', () => {
    test('get', async () => {
        ts.mockServer.mock(
            ({url, method}) => url.path === '/foo' && method === 'POST',
            async ({json}) => {
                expect(await json()).toEqual({incorrect: 'value'});
                return {status: 200, body: {foo: 'bar'}};
            }
        );
        const {data} = await ts.testServer.client().query({
            operationName: 'users/get',
            input: {id: 123}
        });
        expect(data).toEqual({status: true})
    });
});
