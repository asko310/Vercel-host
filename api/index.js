const express = require('express');
const cors = require('cors');  // Import CORS
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());  // CORS 
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
