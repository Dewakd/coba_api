const apiKey = '215985a1-0f74-5e25-e3e1-fa52a14f';
const apiUrl = `https://api.goapi.io/regional/provinsi?api_key=${apiKey}`

axios.get(apiUrl)
    .then(response => {
        const provinsi = response.data.data;
        console.log(provinsi);

        const list_provinsi = document.getElementById('list_provinsi');

        provinsi.forEach(city => {
            const listItem = document.createElement('li');
            const linkItem = document.createElement('a');
            linkItem.href = '#';
            linkItem.textContent = city.name;
            listItem.addEventListener('click', () => {
                axios.get(`https://api.goapi.io/regional/kota?provinsi_id=${city.id}&api_key=${apiKey}`)
                .then(response => {
                    const kab_provinsi = response.data.data;
                    const list_kab = document.getElementById('list_kabupaten');
                    const listSelect = list_kab.querySelectorAll('li');
                    kab_provinsi.forEach(kabupaten => {
                        if (listSelect.length > 0) {
                            listSelect.forEach(item => item.remove());
                        }
                        const listItem = document.createElement('li');
                        listItem.textContent = kabupaten.name;
                        list_kab.appendChild(listItem);
                    })

                })
            
                .catch(error => {
                    console.error('Error:', error);
                });

            });
            list_provinsi.appendChild(listItem);
            listItem.appendChild(linkItem);
        });
            


    })

    .catch(error => {
        console.error('Error:', error);
    });