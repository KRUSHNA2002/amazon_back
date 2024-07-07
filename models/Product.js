
const productSchema=new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    image: String,
    category: String,
    subcategory: String,
    status: String,
    });
    const Product=mongoose.model('Product', productSchema);