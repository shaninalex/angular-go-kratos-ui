function(ctx) {
  userID: ctx.identity.id,
  traits: {
    email: ctx.identity.traits.email,
  },
}