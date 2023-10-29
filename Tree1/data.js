// condition
// 0 - empty
// 1 - added
// 2 - add
// 3 - delete

var departsmentRoot =  {
            id: 1,
            number: '01',
            name: 'Форте Банк',
            hasChildren: true,
            condition: 1
        }


var filials = [
    {
        id: 2,
        number: '001',
        name: 'Первый Филиал',
        hasChildren: false,
        condition: 0
    },
    {
        id: 3,
        number: '002',
        name: 'Второй Филиал',
        hasChildren: true,
        condition: 0
    },
    {
        id: 4,
        number: '003',
        name: 'Третий Филиал',
        hasChildren: false,
        condition: 0
    },
]

var subFilials = [
    {
        id: 5,
        number: '0001',
        name: 'Подразделение 1 Второй филлиал',
        hasChildren: false,
        condition: 0
    },
    {
        id: 6,
        number: '0002',
        name: 'Подразделение 2 Второй филлиал',
        hasChildren: false,
        condition: 0
    },
    {
        id: 7,
        number: '0003',
        name: 'Подразделение 3 Второй филлиал',
        hasChildren: false,
        condition: 0
    },
]