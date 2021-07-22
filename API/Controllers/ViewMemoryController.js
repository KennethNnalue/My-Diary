class ViewMemoryController {

    static fetchViewMemory(request, response){

        return response.json(

            {
                id: 1,
                title: 'My Trip To San Frannscio',
                story: 'Today was so awesome, I enjoyed every bit of the trip',
                mood: 'happy',
                picture: 'https://mypicture.xyz',
                date: '22-02-2022 12:07:06'
            },

        );
    }
}

export default ViewMemoryController;