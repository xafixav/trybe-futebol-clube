export const allMatchesMocked = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
];

export const matchesByQuery = [
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
];

export const allMatchesCorrect = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
];

export const matchesByQueryCorrect = [
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
];

export const allTeamsMock = [
{  dataValues: {
    id: 48,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: 1,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  },
}
]

export const allTeamsMockCorrect = [
 {
      id: 48,
      homeTeam: 13,
      homeTeamGoals: 1,
      awayTeam: 2,
      awayTeamGoals: 1,
      inProgress: true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    },  
  ]

  export const queryTeamsMockFalse = [
    {  dataValues: {
        id: 48,
        homeTeam: 13,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: 0,
        "teamHome": {
          "teamName": "Ferroviária"
        },
        "teamAway": {
          "teamName": "Avaí/Kindermann"
        }
      },
    }
    ]
    
    export const queryTeamsMockFalseCorrect = [
     {
          id: 48,
          homeTeam: 13,
          homeTeamGoals: 1,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: false,
          "teamHome": {
            "teamName": "Ferroviária"
          },
          "teamAway": {
            "teamName": "Avaí/Kindermann"
          }
        },  
      ]