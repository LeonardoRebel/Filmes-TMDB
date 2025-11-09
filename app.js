const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        
        const API_KEY = '391157b2cb5efe62977e2a392877e77b'; 

        const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

        const title = ref('Filmes Populares');
        const movies = ref([]);
        const isLoading = ref(true);

        const getImageUrl = (posterPath) => {
            if (!posterPath) {
                return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
            }
            return `${imageBaseUrl}${posterPath}`;
        };

        const fetchPopularMovies = async () => {
            const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
            
            try {
                const response = await axios.get(url);
                
                const results = response.data.results;
                
                movies.value = results.filter(movie => movie != null); 
                
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
                title.value = "Erro ao carregar filmes (Verifique a API Key)"; 
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {
            fetchPopularMovies(); 
        });

        return {
            title,
            movies,
            isLoading,
            getImageUrl
        };
    }
});

app.mount('#app');