export const noUserResponse =
  Response.json.bind(undefined, { error: 'no-user' }, { status: 401 })

export function errorResponese(error: unknown) {
  console.log(error);
  if(error instanceof Error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
  return Response.json({ error }, { status: 500 })
}
