const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const FeedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    feedback: { type: GraphQLString },
  }),
});

module.exports = FeedbackType;
