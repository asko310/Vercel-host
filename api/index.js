const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

app.post('/products', async (req, res) => {
    const { name, description, price } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, description, price }]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const { data, error } = await supabase.from('products').update({ name, description, price }).eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
});

module.exports = app;



//script maybe
document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image_url = document.getElementById('image_url').value;
    
    const response = await fetch('https://vercel-host-3si3soj6d-asko310s-projects.vercel.app/products', {
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
