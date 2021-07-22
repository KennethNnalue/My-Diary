import path from 'path';

class AllMemoriesControllers {

    static FetchAllMemoriesPage(request, response){
        return response.json(

            [
                {
                     id: 1,
                     title: 'My Trip To San Frannscio',
                     story: 'Today was so awesome, I enjoyed every bit of the trip',
                     mood: 'happy',
                     picture: 'https://mypicture.xyz',
                     date: '22-02-2022 12:07:06'
                 },
                {
                     id: 2,
                     title: 'My Trip To NY',
                     story: 'NY is bae!, I even met a friend today',
                     mood: 'happy',
                     picture: 'https://mypicture.xyz',
                     date: '22-02-2022 12:07:06'
                 },
                {
                     id: 3,
                     title: 'My Day at the Pool',
                     story: 'Today at the pool was so awesome, I learnt how to swim',
                     mood: 'happy',
                     picture: 'https://pool.xyz',
                     date: '22-02-2022 12:07:06'
                 },
                {
                     id: 4,
                     title: 'My excursion trip',
                     story: 'The trip to sambisa was fearful',
                     mood: 'scared',
                     picture: 'https://sambisa.xyz',
                     'date': '22-02-2022 12:07:06'
                 },
                {
                     id: 5,
                     title: 'A Day at my friend\'s place',
                     story: 'We tried different dishes at my friend\'s house',
                     mood: 'happy',
                     picture: 'https://friend.xyz',
                     date: '22-02-2022 12:07:06'
                 },
                {
                     id: 6,
                     title: 'My Love for her',
                     story: 'I saw my self falling for her',
                     mood: 'happy',
                     picture: 'https://mypicture.xyz',
                     date: '22-02-2022 12:07:06'
                 },
              ]
        );
    }
}

export default AllMemoriesControllers;