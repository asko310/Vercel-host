const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Configurează clientul Supabase
const supabaseUrl = 'https://kkszwlbzpsolxwfborid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrc3p3bGJ6cHNvbHh3ZmJvcmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MTg0NzgsImV4cCI6MjAzMzE5NDQ3OH0.AKto-QsvQ5Wa8keOb_HMUtLoJKpAcFOmJy97B3_uFoo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware pentru a parsa JSON
app.use(express.json());

// Endpoint pentru a obține toate produsele
app.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});

// Endpoint pentru a obține un produs după ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});

// Endpoint pentru a crea un nou produs
app.post('/products', async (req, res) => {
    const { name, description, price } = req.body;
    const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, price }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
});

// Endpoint pentru a actualiza un produs
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const { data, error } = await supabase
        .from('products')
        .update({ name, description, price })
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});

// Endpoint pentru a șterge un produs
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
