const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList} = graphql;
const Game = require("../model/game");
const Feeling = require("../model/feeling");
const Reason = require("../model/reason");

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
        name: {type: GraphQLString},
        games: { // What games have this feeling.
            type: new GraphQLList(gameType),
            resolve: (parent, args) => {
                const results = tempData.filter(element => element.feelingId === parent.id); // Look at games, match game feeling id with parent id (reason id).
                return results;
            }
        }
    })
});

const reasonType = new GraphQLObjectType({
    name: "Reason",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        games: {
            type: new GraphQLList(gameType),
            resolve: (parent, args) => {
                const results = tempData.filter(element => element.reasonId === parent.id);
                return results;
            }
        }
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
                return results
            }
        },
        feeling: {
            type: feelingType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                const results = tempFeeling.find(feelingElement => feelingElement.id === args.id);
                return results;
            }
        },
        reason: {
            type: reasonType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                const results = tempReason.find(reasonElement => reasonElement.id === args.id);
                return results;
            }
        },
        games: {
            type: new GraphQLList(gameType),
            resolve: () => {
                return tempData;
            }
        },
        feelings: {
            type: new GraphQLList(feelingType),
            resolve: () => {
                return tempFeeling;
            }
        },
        reasons: {
            type: new GraphQLList(reasonType),
            resolve: () => {
                return tempReason;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addGame: {
            type: gameType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString}
            },
            resolve: (parent, args) => {
                let game = new Game({
                    name: args.name,
                    genre: args.genre
                });
                return game.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})