const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const userData = require("../MOCK_DATA.json");
const connectDB = require("../config/db");
const FeedbackDB = require("../config/feedbackdb");

const UserType = require("./TypeDefs/UserType");
const FeedbackType = require("./TypeDefs/FeedbackType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // console.log("args", args);
        return args;
      },
    },
  },
});
const db = connectDB;
const dbfeedback = FeedbackDB;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        occupation: { type: GraphQLString },
        // lastName: { type: GraphQLString },
        // email: { type: GraphQLString },
        // password: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("UserType", UserType);
        console.log("args", args);
        db.collection("user").insertOne({
          name: args.firstName,
          occupation: args.occupation,
        });
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          occupation: args.occupation,
          // lastName: args.lastName,
          // email: args.email,
          // password: args.password,
        });
        return args;
      },
    },
    createFeedback: {
      type: FeedbackType,
      args: {
        firstName: { type: GraphQLString },
        feedback: { type: GraphQLString },
        userId: { type: GraphQLString },

        // lastName: { type: GraphQLString },
        // email: { type: GraphQLString },
        // password: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("UserType createFeedback", FeedbackType);
        console.log("args", args);
        dbfeedback.collection("user-feedbacks").insertOne({
          // name: args.firstName,
          name: args.firstName,
          userId: args.userId,
          feedback: args.feedback,
        });
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          occupation: args.occupation,
          // lastName: args.lastName,
          // email: args.email,
          // password: args.password,
        });

        return args;
      },
    },
  },
  // fields: {},
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
