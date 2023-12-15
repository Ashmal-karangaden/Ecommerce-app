import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';


export const categoryController = async(req,res)=>{
    try{
        const category = await categoryModel.find({})
            res.status(200).send({
                success:true,
                message:'All Category List',
                category,
            })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:'false',
            err,
            message:'Error while getting all category',
        })
    }
}

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is Required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already exist'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send(
            {
                success: true,
                message: 'New Category Created',
                category
            }
        )
    } catch (err) {
        console.log(err)
        return res.status(401).send(
            {
                success: false,
                message: 'Error in Category',
                err
            }
        )
    }

}
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        console.log(id)
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Category Updated successfully',
            category
        })
    } catch (err) {
        console.log(err)
        req.status(500).send({
            success: false,
            err,
            message: 'Error While Updating Category'
        })
    }
}


export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: 'Category deleted Successfully',
            deleteCategory
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'error while deleting category',
            err
        })
    }
}

export const singleCategoryController = async(req,res)=>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting Single Category',
            error
        })
    }
}