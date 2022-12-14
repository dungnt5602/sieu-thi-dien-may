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
        title: `Th??m danh m???c "${params.inputValue}"`,
      });
    }

    return filtered;
  }

  const onFilterOptionTag = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        title: `Th??m nh??n "${params.inputValue}"`,
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
      <h1>Th??m s???n ph???m</h1>
      <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#ccc",
          }
        }}>
        <i className="fa-solid fa-chevron-left"></i>
        Quay l???i danh s??ch s???n ph???m
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  T??n s???n ph???m
                </Typography>
                <input type="text" name="productName" placeholder="Nh???p t??n s???n ph???m" {...register("productName", { required: "Y??u c???u nh???p t??n s???n ph???m" })}
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
                  Danh m???c s???n ph???m
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
                  renderInput={(params) => <TextField {...params} color="common" placeholder="Nh???p danh m???c s???n ph???m"
                    name="category" {...register("category", { required: "Y??u c???u nh???p danh m???c s???n ph???m" })}
                  />}
                />
                {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}

                <Typography variant="h6" component="h6" sx={{ fontSize: "16px", mt: "12px" }}>
                  M?? t???
                </Typography>
                <textarea name="description" placeholder="Nh???p m?? t???" {...register("description", { required: "Y??u c???u nh???p m?? t???" })}
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
                  Th????ng hi???u
                </Typography>
                <input type="text" name="brand" placeholder="Nh???p th????ng hi???u" {...register("brand", { required: "Y??u c???u nh???p th????ng hi???u" })}
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
                  Nh??n s???n ph???m
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
                  renderInput={(params) => <TextField {...params} color="common" placeholder="Th??m nh??n s???n ph???m" name="tag" {...register("tag", { required: "Y??u c???u nh???p nh??n cho s???n ph???m" })} />}
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
                  ?????c ??i???m
                </Typography>
                <textarea name="characteristic" placeholder="Nh???p ?????c ??i???m" {...register("characteristic", { required: "Y??u c???u nh???p ?????c ??i???m s???n ph???m" })}
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
                    ???nh s???n ph???m
                  </Typography>
                  <input type="file" onChange={uploadImage} id="file" className="inputfile" />
                  <label htmlFor="file">Th??m ???nh s???n ph???m</label>
                </Stack>
                {imageURL.length !== 0 && <img src={imageURL} alt="product image" width="100%" />}
                {imageURL.length === 0 && <Box align="center" sx={{ mt: "36px" }}>
                  <img
                    src={require("../../images/products/product.jpg")}
                    width="150px" alt="product image"
                  />
                  <Typography sx={{ color: "#637381", fontWeight: 550, fontSize: "14px", m: "12px auto 24px", opacity: "0.8" }}>
                    H??y ch???n m???t ???nh cho s???n ph???m n??y
                  </Typography>
                </Box>}
                {isLoading && <LinearProgress sx={{ m: "12px 0" }} variant="determinate" value={progress} />}
                {<input name="image" value={imageURL} style={{ display: "none" }}
                  {...register("image", { required: "Y??u c???u nh???p ???nh cho s???n ph???m" })} />}
                {errors.image && <span style={{ color: "red" }}>{errors.image.message}</span>}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ height: "100%" }}>
              <Box p={3}>
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Gi??
                </Typography>
                <input type="number" name="price" min="0" placeholder="Nh???p gi??" {...register("price", { required: "Y??u c???u nh???p gi??" })}
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
                  Ph???n tr??m khuy???n m??i
                </Typography>
                <input type="number" name="discount" min="0" max="100" placeholder="Nh???p ph???n tr??m khuy???n m??i" {...register("discount", { required: "Y??u c???u nh???p ph???n tr??m khuy???n m??i" })}
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
                  S??? l?????ng s???n ph???m
                </Typography>
                <input type="number" name="quantity" min="0" placeholder="Nh???p s??? l?????ng" {...register("quantity", { required: "Y??u c???u nh???p s??? l?????ng" })}
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
          Th??m
        </Button>
      </form>
      <Snackbar open={isAdd} autoHideDuration={6000} onClose={() => setIsAdd(false)}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Th??m s???n ph???m th??nh c??ng
        </Alert>
      </Snackbar>
      <Snackbar open={alerts.category} autoHideDuration={6000} onClose={() => setAlerts({ ...alerts, 'category': false })}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Th??m danh m???c th??nh c??ng
        </Alert>
      </Snackbar>
      <Snackbar open={alerts.tag} autoHideDuration={6000} onClose={() => setAlerts({ ...alerts, 'tag': false })}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Th??m nh??n s???n ph???m th??nh c??ng
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