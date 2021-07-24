import {deleteMemory} from '../Helpers/query';


class MemoryDeleteController {

    static deleteMemory(request, response) {

        const diaryId = request.params.id;

        deleteMemory(diaryId);

        return response.status(200).json({
            message: "Memory have been deleted"
        });
    }
}

export default MemoryDeleteController;