import { Grid, Paper, Box, Stack, Typography, Button } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CategoriesAPI from "../../api/CategoriesAPI";
import TagsAPI from "../../api/TagsAPI";
import ProductsAPI from "../../api/ProductsAPI";
import { GlobalState } from "../../auth/GlobalState";
import { Snackbar, Alert } from "@mui/material";
import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { AddCategories } from "../categories/AddCategories";

const filter = createFilterOptions();

const AddProduct = () => {
  const accessToken = localStorage.getItem("token");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [chips, setChips] = React.useState([]);
  const { isAdd, setIsAdd } = React.useContext(GlobalState);
  const [imageURL, setImageURL] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [currentTag, setCurrentTag] = React.useState(null);
  const [alerts, setAlerts] = React.useState({ category: false, tag: false });
  const [open, toggleOpen] = React.useState(false);

  console.log("isSelected", chips);
  console.log("tags", tags);
  const uploadImage = (event) => {
    if (event.target.files[0] == null) return;
    const imageRef = ref(storage, `products/${event.target.files[0].name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, event.target.files[0]);
    uploadTask.on('state_changed',
      (snapshot) => {
        setIsLoading(true);
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setIsLoading(false);
          reset({ image: downloadURL })
        });
      }
    );
  }

  const addCategory = (childData) => {
    setCategory(childData.category);
    toggleOpen(childData.toggleOpen);
    setAlerts({ ...alerts, 'category': childData.alerts });
  }

  const onChangeSelect = (event, newValue) => {
    errors.category = false;
    if (typeof newValue === 'string') {
      setTimeout(() => {
        toggleOpen(true);
        setCategory(newValue.inputValue);
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setCategory(newValue.inputValue);
    } else {
      setCategory(newValue);
    }
  };

  const addTags = (tag) => {
    TagsAPI.addTags({ 'name': tag }, accessToken)
      .then((res) => {
        setChips([...chips, {
          'id': res.data.id,
          'name': res.data.name
        }]);
        setAlerts({ ...alerts, 'tag': true });
      }).catch(err => {
        console.log(err);
      })
  }

  const onChangeSelectTag = (event, newValue) => {
    errors.tag = false;
    if (typeof newValue === 'string') {
      setTimeout(() => {
        addTags(newValue.inputValue);
      });
    } else if (newValue && newValue.inputValue) {
      addTags(newValue.inputValue);
    } else {
      setCurrentTag(newValue);
      setChips([...chips, {
        'id': newValue.id,
        'name': newValue.title
      }]);
      setTags(tags.filter(tag => tag.title !== newValue.title));
    }
  };

  const onFilterOption = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        title: `Thêm danh mục "${params.inputValue}"`,
      });
    }

    return filtered;
  }

  const onFilterOptionTag = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        title: `Thêm nhãn "${params.inputValue}"`,
      });
    }

    return filtered;
  }

  const getOptionLabel = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.title;
  }

  const handleDeleteChip = (data) => {
    setChips(chips.filter(chip => chip.id !== data.id));
    setTags([{ 'id': data.id, 'title': data.name }, ...tags]);
  }

  const getBack = () => {
    window.history.back();
  }

  useEffect(() => {
    CategoriesAPI.getCategories().then(res => {
      if (res.data.content !== undefined) {
        let categoryList = [];
        res.data.content.forEach((category) => {
          categoryList.push({ 'id': category.id, 'title': category.name });
        });
        setCategories(categoryList);
      }
    }).catch(err => {
      console.log(err);
    }
    )

    TagsAPI.getTags().then(res => {
      if (res.data.content !== undefined) {
        let tagList = [];
        res.data.content.forEach((tag) => {
          tagList.push({ 'id': tag.id, 'title': tag.name });
        });
        setTags(tagList);
      }
    })
      .catch(err => {
        alert(err);
      });
  }, [])

  const onSubmit = async (data) => {
    const product = {
      name: data.productName,
      description: data.description,
      title: data.brand,
      quantity: data.quantity,
      imgLink: imageURL,
      price: data.price,
      discount: data.discount,
      category: { 'id': category.id },
      code: "PR" + Math.floor(Math.random() * 1000000),
      tags: chips,
      characteristic: data.characteristic
    }


    ProductsAPI.addProduct(product, accessToken).then(res => {
      setIsAdd(true);
      getBack();
    }).catch(err => {
      console.log(err);
    }
    );
  }

  return (
    <div>
      <h1>Thêm sản phẩm</h1>
      <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#ccc",
          }
        }}>
        <i className="fa-solid fa-chevron-left"></i>
        Quay lại danh sách sản phẩm
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Tên sản phẩm
                </Typography>
                <input type="text" name="productName" placeholder="Nhập tên sản phẩm" {...register("productName", { required: "Yêu cầu nhập tên sản phẩm" })}
                  style={{
                    width: "100%",
                    marginBottom: "24px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.productName && <span style={{ color: "red" }}>{errors.productName.message}</span>}

                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Danh mục sản phẩm
                </Typography>
                <Autocomplete
                  value={category}
                  sx={{ m: "8px auto 16px" }}
                  className="autocomplete"
                  onChange={onChangeSelect}
                  filterOptions={onFilterOption}
                  options={categories}
                  getOptionLabel={getOptionLabel}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  renderInput={(params) => <TextField {...params} color="common" placeholder="Nhập danh mục sản phẩm"
                    name="category" {...register("category", { required: "Yêu cầu nhập danh mục sản phẩm" })}
                  />}
                />
                {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}

                <Typography variant="h6" component="h6" sx={{ fontSize: "16px", mt: "12px" }}>
                  Mô tả
                </Typography>
                <textarea name="description" placeholder="Nhập mô tả" {...register("description", { required: "Yêu cầu nhập mô tả" })}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "10px",
                    height: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",

                  }} />
                {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Thương hiệu
                </Typography>
                <input type="text" name="brand" placeholder="Nhập thương hiệu" {...register("brand", { required: "Yêu cầu nhập thương hiệu" })}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.brand && <span style={{ color: "red" }}>{errors.brand.message}</span>}
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Nhãn sản phẩm
                </Typography>
                <Autocomplete
                  value={currentTag}
                  sx={{ m: "8px auto 16px" }}
                  className="autocomplete"
                  onChange={onChangeSelectTag}
                  filterOptions={onFilterOptionTag}
                  options={tags}
                  getOptionLabel={getOptionLabel}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  renderInput={(params) => <TextField {...params} color="common" placeholder="Thêm nhãn sản phẩm" name="tag" {...register("tag", { required: "Yêu cầu nhập nhãn cho sản phẩm" })} />}
                />
                {chips.length !== 0 && <Box sx={{ mb: "-12px" }}>
                  {chips.map((chip, index) => (
                    <Chip label={chip.name} key={index} variant="outlined"
                      onDelete={() => { handleDeleteChip(chip) }}
                      sx={{ mb: "8px", mr: "8px" }} />
                  ))}
                </Box>}
                {errors.tag && <span style={{ color: "red" }}>{errors.tag.message}</span>}
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px", mt: "12px" }}>
                  Đặc điểm
                </Typography>
                <textarea name="characteristic" placeholder="Nhập đặc điểm" {...register("characteristic", { required: "Yêu cầu nhập đặc điểm sản phẩm" })}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "10px",
                    height: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.characteristic && <span style={{ color: "red" }}>{errors.characteristic.message}</span>}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: "12px" }}>
                  <Typography variant="h6" component="h6" sx={{ fontSize: "16px", mr: "32px" }}>
                    Ảnh sản phẩm
                  </Typography>
                  <input type="file" onChange={uploadImage} id="file" className="inputfile" />
                  <label htmlFor="file">Thêm ảnh sản phẩm</label>
                </Stack>
                {imageURL.length !== 0 && <img src={imageURL} alt="product image" width="100%" />}
                {imageURL.length === 0 && <Box align="center" sx={{ mt: "36px" }}>
                  <img
                    src={require("../../images/products/product.jpg")}
                    width="150px" alt="product image"
                  />
                  <Typography sx={{ color: "#637381", fontWeight: 550, fontSize: "14px", m: "12px auto 24px", opacity: "0.8" }}>
                    Hãy chọn một ảnh cho sản phẩm này
                  </Typography>
                </Box>}
                {isLoading && <LinearProgress sx={{ m: "12px 0" }} variant="determinate" value={progress} />}
                {<input name="image" value={imageURL} style={{ display: "none" }}
                  {...register("image", { required: "Yêu cầu nhập ảnh cho sản phẩm" })} />}
                {errors.image && <span style={{ color: "red" }}>{errors.image.message}</span>}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Giá
                </Typography>
                <input type="number" name="price" min="0" placeholder="Nhập giá" {...register("price", { required: "Yêu cầu nhập giá" })}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.price && <span style={{ color: "red" }}>{errors.price.message}</span>}
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Phần trăm khuyến mãi
                </Typography>
                <input type="number" name="discount" min="0" max="100" placeholder="Nhập phần trăm khuyến mãi" {...register("discount", { required: "Yêu cầu nhập phần trăm khuyến mãi" })}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                  }} />
                {errors.discount && <span style={{ color: "red" }}>{errors.discount.message}</span>}
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Số lượng sản phẩm
                </Typography>
                <input type="number" name="quantity" min="0" placeholder="Nhập số lượng" {...register("quantity", { required: "Yêu cầu nhập số lượng" })}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{
          backgroundColor: '#fff',
          color: '#00a8ff',
          fontSize: '14px',
          padding: '5px 20px',
          borderRadius: '5px',
          marginTop: '25px',
          marginLeft: "93%",
        }}>
          Thêm
        </Button>
      </form>
      <Snackbar open={isAdd} autoHideDuration={6000} onClose={() => setIsAdd(false)}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Thêm sản phẩm thành công
        </Alert>
      </Snackbar>
      <Snackbar open={alerts.category} autoHideDuration={6000} onClose={() => setAlerts({ ...alerts, 'category': false })}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Thêm danh mục thành công
        </Alert>
      </Snackbar>
      <Snackbar open={alerts.tag} autoHideDuration={6000} onClose={() => setAlerts({ ...alerts, 'tag': false })}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Thêm nhãn sản phẩm thành công
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={() => toggleOpen(false)}>
        <Box sx={{ padding: "40px" }}>
          <AddCategories parentCallback={addCategory} nameInput={category} />
        </Box>
      </Dialog>
    </div>
  )
}

export default AddProduct;