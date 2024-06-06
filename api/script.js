document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image_url = document.getElementById('image_url').value;
    
    const response = await fetch('https://your-vercel-app.vercel.app/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, name, description, price, image_url })
    });
    
    if (response.ok) {
        alert('Produs adăugat cu succes!');
        document.getElementById('productForm').reset();
    } else {
        const errorData = await response.json();
        alert('Eroare la adăugarea produsului: ' + errorData.error);
    }
});
