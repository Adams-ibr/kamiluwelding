// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { Product } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
    const { addProduct, updateProduct } = useAdmin();
    const [formData, setFormData] = React.useState({
        name: product?.name || '',
        description: product?.description || '',
        imageUrl: product?.imageUrl || '',
        gallery: product?.gallery.join(', ') || '',
        category: product?.category || '',
        applications: product?.applications.join(', ') || '',
        materials: product?.materials.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...formData,
            gallery: formData.gallery.split(',').map(item => item.trim()),
            applications: formData.applications.split(',').map(item => item.trim()),
            materials: formData.materials.split(',').map(item => item.trim()),
        };

        if (product) {
            updateProduct({ ...product, ...productData });
        } else {
            addProduct(productData);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start py-10 overflow-y-auto"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 dark:bg-gray-800"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-6">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
                        </div>
                         <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="imageUrl">Main Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="gallery">Gallery Image URLs (comma-separated)</Label>
                            <Input id="gallery" name="gallery" value={formData.gallery} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="applications">Applications (comma-separated)</Label>
                            <Input id="applications" name="applications" value={formData.applications} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="materials">Materials (comma-separated)</Label>
                            <Input id="materials" name="materials" value={formData.materials} onChange={handleChange} />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Product</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductForm;
