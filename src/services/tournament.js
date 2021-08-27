import _ from "lodash";

const checkValues = (number) => {
  if (number === 1) return 1;
  const newValue = number / 2;
  if (newValue === 1) {
    return 1;
  }
  return checkValues(newValue) + 1;
};

const generateTournament = (games) => {
  const tournamentGames = _.groupBy(games, "round");

  const days = Object.keys(tournamentGames).map((day) => {
    const dayMatchs = tournamentGames[day];
    return {
      title: `Dia ${day}`,
      seeds: dayMatchs.map((match) => {
        const teams = [
          {
            ...match.homeTeam,
            id: match.customData?.homeTeam ? match.customData.homeTeam : ""
          },
          {
            ...match.awayTeam,
            id: match.customData?.awayTeam ? match.customData.awayTeam : ""
          }
        ];
        return {
          id: match.id,
          teams
        };
      })
    };
  });
  
  if (days[0].seeds.length < (days[1].seeds.length * 2) ) {
    const emptyMatches = (days[1].seeds.length * 2) - days[0].seeds.length;
    for (let i = 0; i < emptyMatches; i++) {
      days[0].seeds.push({});
    }
  }
  const missings = checkValues(days[days.length - 1].seeds.length);
  const finals = Array
    .from( {length: missings}, (x,i) =>  Math.pow(2, i) )
    .reverse()
    .map( (seeds, index) => {
      const lastDay = days.length + index;
      return {
        title: `Dia ${lastDay + 1}`,
        seeds: Array.from({length:seeds}).map((m, idx) => {
          const prevMatch = lastDay > days.length ? false: days[lastDay - 1];
          console.log(prevMatch);
          return {
            id: `MS${index}${idx}`,
            teams: [
              {
                name: "En espera",
                id: prevMatch.seeds ? prevMatch.seeds[2 * index].id : `MS${index - 1}${ 2 * idx}`
              },
              {
                name: "En espera",
                id: prevMatch.seeds ? prevMatch.seeds[2 * index + 1].id : `MS${index - 1}${ 2 * idx + 1}`
              }
            ]
          };
        })
      };
    } )

  return days.concat(finals);
}

export { generateTournament }