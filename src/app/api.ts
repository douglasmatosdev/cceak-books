import axios from 'axios';

export const fetchBookDetails = async (isbn: string) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`);
        return response.data.items[0].volumeInfo;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
}
