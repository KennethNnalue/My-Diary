import {createMemory} from '../Helpers/query';

class MemoryCreateController {

    static createMemory(request, response) {

        const title = request.body.title;
        const mood = request.body.mood;
        const story = request.body.story;
        const picture = request.body.picture;
      
        createMemory(title, story, mood, picture);

        return response.status(201).json({
            message:"Memory has been created"
        }
        )
    }
}

export default MemoryCreateController;
