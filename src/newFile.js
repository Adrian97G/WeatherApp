/* __placeholder__ */
export default (await import('vue')).defineComponent({
name: 'App',
data() {
return {
api_key: '0baea3f49194aa6e2432a080125f865b',
url_base: 'https://api.openweathermap.org/data/2.5/',
query: '',
weather: {}
};
},
methods: {
fetch_weather(e) {
if (e.key === "Enter") {
fetch(input, `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`);
}
}
}
});
