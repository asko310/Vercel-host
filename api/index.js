const express = require('express');
const cors = require('cors');  // Import CORS
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());  // CORS 
app.use(express.json());

const supabaseUrl = 'https://kkszwlbzpsolxwfborid.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrc3p3bGJ6cHNvbHh3ZmJvcmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MTg0NzgsImV4cCI6MjAzMzE5NDQ3OH0.AKto-QsvQ5Wa8keOb_HMUtLoJKpAcFOmJy97B3_uFoo';
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
    const { data, error } = await supabase.from('products').insert([{ ...req.body }]);
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
app.get('/admin', express.static('admin'));
module.exports = app;
