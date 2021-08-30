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

  const days = Object.keys(tournamentGames).map((day, indexDay) => {
    const dayMatchs = tournamentGames[day];
    return {
      title: `Dia ${day}`,
      order: Number(day),
      seeds: dayMatchs.map((match, index) => {  
        const home = 
          match.homeTeam === 'En espera' 
          ?  {name:match.homeTeam} 
          : match.homeTeam;
        const away =  
          match.awayTeam === 'En espera' 
          ?  {name:match.awayTeam} 
          : match.awayTeam;

        const teams = [
          {
            ...home,
            id: indexDay === 0 ? '' : `MS${day-1}${index * 2}`
          },
          {
            ...away,
            id: indexDay === 0 ? '' : `MS${day-1}${index * 2 + 1}`
          }
        ];
        return {
          id: `MS${day}${index}`,
          teams
        };
      })
    };
  });
  
  if (days.length > 1 && days[0].seeds.length < (days[1].seeds.length * 2) ) {
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
        order: Number(lastDay + 1),
        seeds: Array.from({length:seeds}).map((m, idx) => {                   
          return {
            id: `MS${lastDay + 1}${idx}`,
            teams: [
              {
                name: "En espera",
                id: `MS${lastDay}${2 * idx}`
              },
              {
                name: "En espera",
                id: `MS${lastDay}${2 * idx + 1}`
              }
            ]
          };
        })
      };
    } )

  return days.concat(finals);
}

export { generateTournament }