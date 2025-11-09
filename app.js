const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        
        const API_KEY = '391157b2cb5efe62977e2a392877e77b'; 

        const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

        const title = ref('Filmes em Cartaz');
        const movies = ref([]);
        const selectedMovie = ref(null);
        const isLoading = ref(true);

        const getImageUrl = (posterPath) => {
            if (!posterPath) {
                return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
            }
            return `${imageBaseUrl}${posterPath}`;
        };

        const fetchNowPlayingMovies = async () => {
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`;
            
            try {
                const response = await axios.get(url);
                
                const results = response.data.results;
                
                movies.value = results.filter(movie => movie != null); 
                
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
                title.value = "Erro ao carregar filmes"; 
            } finally {
                isLoading.value = false;
            }
        };

        const fetchMovieDetails = async (movieId) => {
            isLoading.value = true;
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`;
            try {
                const response = await axios.get(url);
                selectedMovie.value = response.data;
                title.value = selectedMovie.value.title;
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
                title.value = "Erro ao carregar detalhes";
            } finally {
                isLoading.value = false;
            }
        };

        const selectMovie = (movie) => {
            fetchMovieDetails(movie.id);
        };

        const goBack = () => {
            selectedMovie.value = null;
            title.value = 'Filmes em Cartaz';
        };

        onMounted(() => {
            fetchNowPlayingMovies(); 
        });

        return {
            title,
            movies,
            selectedMovie,
            isLoading,
            getImageUrl,
            selectMovie,
            goBack
        };
    }
});

app.mount('#app');