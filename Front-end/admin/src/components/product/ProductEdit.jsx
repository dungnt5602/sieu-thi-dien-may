import React, { useEffect } from "react";
import ProductsAPI from "../../api/ProductsAPI";
import TagsAPI from "../../api/TagsAPI";
import { useParams } from "react-router-dom";
import { Typography, Grid, Paper, Box, Button, Stack } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { useForm } from "react-hook-form";
import { GlobalState } from "../../auth/GlobalState";
import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

const filter = createFilterOptions();

const ProductEdit = () => {
  const accessToken = localStorage.getItem("token");
  const [product, setProduct] = React.useState({});
  const [category, setCategory] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [chips, setChips] = React.useState([]);
  const [currentTag, setCurrentTag] = React.useState(null);
  const [alerts, setAlerts] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { token, setIsEdit } = React.useContext(GlobalState);
  const { id } = useParams();

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
        });
      }
    );
  }

  const addTags = (tag) => {
    TagsAPI.addTags({ 'name': tag }, accessToken)
      .then((res) => {
        setChips([...chips, {
          'id': res.data.id,
          'name': res.data.name
        }]);
        setAlerts(true);
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

  useEffect(() => {
    let chipArr = [];

    ProductsAPI.getProductById(id).then(res => {
      setProduct(res.data);
      setCategory(res.data.category.name);
      setChips(res.data.tags);
      chipArr = [...res.data.tags];
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })

    TagsAPI.getTags().then(res => {
      if (res.data.content !== undefined) {
        let tagList = [];
        res.data.content.forEach((tag) => {
          tagList.push({ 'id': tag.id, 'title': tag.name });
        });
        chipArr.forEach(chip => {
          tagList = tagList.filter(tag => tag.id !== chip.id);
        })
        setTags(tagList);
      }
    })
      .catch(err => {
        alert(err);
      });
  }, [id]);

  //set default value for input
  useEffect(() => {
    if (product) {
      reset({
        productName: product.name,
        description: product.description,
        brand: product.title,
        quantity: product.quantity,
        characteristic: product.characteristic,
        summary: product.summary,
        image: product.imgLink,
        price: product.price,
        discount: product.discount,
      })
      setImageURL(product.imgLink);
    }
  }, [product, reset]);

  const getBack = () => {
    window.history.back();
  }


  const onSubmit = (data) => {
    console.log(data);
    console.log("ADD")
    const addProduct = {
      id: product.id,
      name: data.productName,
      description: data.description,
      title: data.brand,
      quantity: data.quantity,
      categoryCode: product.categoryCode,
      characteristic: product.characteristic,
      imgLink: imageURL,
      price: data.price,
      discount: data.discount,
      category: product.category,
      code: product.code,
      createDate: product.createDate,
      modifiedDate: product.modifiedDate,
      newPrice: product.newPrice,
      tags: product.tags,
      status: product.status
    }

    ProductsAPI.updateProduct(addProduct, token).then(res => {
      console.log(res);
      setIsEdit(true);
      getBack();
    }).catch(err => {
      console.log(err);
    });
  }

  if (imageURL === undefined) return null;
  return (
    <div>
      <h1>Ch???nh s???a th??ng tin s???n ph???m</h1>
      <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#ccc",
          }
        }}>
        <i class="fa-solid fa-chevron-left"></i>
        Quay l???i s???n ph???m
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
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
                {errors.productName && <span style={{ color: "red" }}>{errors.productName.message}</span>}

                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Danh m???c
                </Typography>
                <input type="text" defaultValue={category} disabled
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />

                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
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
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
                  Code
                </Typography>
                <input type="text" disabled defaultValue={product.code} name="code"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    marginTop: "10px",
                    height: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }} />
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
                  renderInput={(params) => <TextField {...params} color="common" placeholder="Th??m nh??n s???n ph???m" />}
                />
                {chips.length !== 0 && <Box sx={{ mb: "-12px" }}>
                  {chips.map((chip, index) => (
                    <Chip label={chip.name} key={index} variant="outlined"
                      onDelete={() => { handleDeleteChip(chip) }}
                      sx={{ mb: "8px", mr: "8px" }} />
                  ))}
                </Box>}
                {<input name="tag" value={chips[0] !== undefined ? chips[0].name : ''}
                  style={{ height: 0, width: 0, border: "none" }}
                  {...register("tag", { required: "Y??u c???u nh???p nh??n cho s???n ph???m" })} />}
                {errors.tag && <span style={{ color: "red" }}>{errors.tag.message}</span>}
                <Typography variant="h6" component="h6" sx={{ fontSize: "16px" }}>
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
                {imageURL.length !== 0 && <img src={imageURL} alt="product image" />}
                {isLoading && <LinearProgress sx={{ mt: "12px" }} variant="determinate" value={progress} />}
                {<input name="image" value={imageURL} style={{ height: 0, width: 0, border: "none" }}
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
                  S??? l?????ng
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
          L??u
        </Button>
      </form>
    </div>
  );
}

export default ProductEdit;