const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

const tempData = [
    {name:"namer", genre: "tempGenre", id: "1", feelingId: "1", reasonId: "1"},
    {name:"namer2", genre: "tempGenre2", id: "2", feelingId: "2", reasonId: "2"}
];

const tempFeeling = [
    {name: "Cozy", id: "1"},
    {name: "Ambience", id: "2"}
]

const tempReason = [
    {name: "Clunky/Slow", id: "1"},
    {name: "Music", id: "2"}
]

const gameType = new GraphQLObjectType({ // set the game type
    name: "Game",
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        feeling: {
            type: feelingType,
            resolve: (parent, args) => {
                const results = tempFeeling.find(element => element.id === parent.feelingId);
                return results;
            }
        },
        reason: {
            type: reasonType,
            resolve: (parent, args) => {
                const results = tempReason.find(element => element.id === parent.reasonId);
                return results;
            }
        }
    })
});

const feelingType = new GraphQLObjectType({
    name: "Feeling",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});

const reasonType = new GraphQLObjectType({
    name: "Reason",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({ // set what queries there are
    name: "RootQueryType",
    fields: {
        game: {
            type: gameType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                const results = tempData.find(gameElement => gameElement.id === args.id);
                console.log(results);
                return results
            }
        },
        feeling: {
            type: feelingType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                const results = tempFeeling.find(feelingElement => feelingElement.id === args.id);
                console.log(results);
                return results;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})