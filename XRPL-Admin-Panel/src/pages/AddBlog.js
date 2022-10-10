import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, FormLabel, TextareaAutosize } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import { Input } from '@mui/material';
import './addBlog.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import plugins from 'suneditor/src/plugins';
import { useEffect, useState, useRef } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, getSingleBlog, getSingleBlogData, updateBlog } from 'src/module/action/blog';
import { useAlert } from 'react-alert';
export default function Blog() {
  const blogRef = useRef(null);
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState('')
  const dispatch = useDispatch()
  let alert = useAlert();
  const navigation = useNavigate()
  const blogLoader = useSelector(e => e.Blog.blogLoader)
  const singleBlog = useSelector(e => e.Blog.singleBlog)
  const [tagValue, setTagValue] = useState('')
  const [tagArr, setTagArr] = useState([])

  const [data, setData] = useState({
    blogTitle: "",
    blogImage: "",
    blogData: "",
    blogDescription: '',
    blogTags: ""
  })

  useEffect(() => {
    const url = new URL(window.location)
    const id = url.searchParams.get('id')
      // setEditId(id)
      if(id){
        dispatch(getSingleBlog(id))
      }else{
        dispatch(getSingleBlogData(false))
      }
      
  }, [])

  useEffect(() => {
    if (singleBlog[0]) {
      // setContent('')
      setEditId(singleBlog[0]._id)
      // console.log(singleBlog[0])
      handleChange(singleBlog[0].blogData)
      setImage(singleBlog[0].blogImage)
      setTagArr(singleBlog[0].blogTags)
      setData({
        blogTitle: singleBlog[0].blogTitle,
        blogImage: singleBlog[0].blogImage,
        blogDescription: singleBlog[0].blogDescription
      })
    }
     else {
      clearState()
    }
    // console.log(singleBlog[0])
  }, [singleBlog])



  const handleChange = (content) => {
    document.getElementById('blogRef').innerHTML = content;
    setContent(content);
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let obj = { ...data }
      obj.blogImage = reader.result
      setImage(reader.result)
      setData(obj)
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };
  }


  const clearState = () => {
    setContent('')
    setEditId("")
    handleChange(``)
    setImage('')
    setData({
      blogTitle: "",
      blogImage: "",
      blogData: "",
      blogDescription: '',
      blogTags: ""
    })
  }


  const submit = () => {
    let obj = { ...data, blogData: content, blogTags:tagArr }
    if (editId) {
      // console.log('edit')
      dispatch(updateBlog(obj, clearState, alert, editId, navigation))
    } else {
      // console.log('save')
      dispatch(addBlog(obj, clearState, alert))
    }
  }

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <div className="mainBlogPage">
          <div className="formBlogPage">
            <Typography variant="h3" guterBottom>
              Add New Blog
            </Typography>
            <div className="addBLogForm">
              <div className='rowForm'>
                <div className='inputTitle imageInput'>
                  <Typography variant="h6" gutterBottom>
                    Upload Blog title Image <sup style={{ color: 'red' }}>*</sup>
                  </Typography>
                  <div className='formLabelUploadDiv'>
                    {image ?
                      <div className='cancelIcons' onClick={() => setImage('')}>
                        <Iconify icon={'ic:sharp-cancel'} width={22} height={22} />
                      </div>
                      : null}
                    <label className="formLabelUpload">
                      {image ?
                        null
                        :
                        <Input type="file" className="formInputUpload" onChange={(e) => getBase64(e.target.files[0])} />
                      }
                      <div>
                        {image ?
                          <img src={image} />
                          :
                          <Iconify icon={'eva:cloud-upload-fill'} width={22} height={22} />
                        }

                      </div>
                    </label>
                  </div>
                </div>

                <div className='inputTitle titleInputDiv'>
                  <Typography variant="h6" gutterBottom>
                    Title <sup style={{ color: 'red' }}>*</sup>
                  </Typography>
                  <Input value={data.blogTitle} type="text" className="titleInput" onChange={(e) => {
                    let obj = { ...data }
                    obj.blogTitle = e.target.value
                    setData(obj)
                  }} />
                  <Typography variant="h6" gutterBottom>
                    Short Description <sup style={{ color: 'red' }}>*</sup>
                  </Typography>
                  <Input value={data.blogDescription} multiline rows={5} type="text" className="titleInput" placeholder='Add short description of your blogs.' onChange={(e) => {
                    let obj = { ...data }
                    obj.blogDescription = e.target.value
                    setData(obj)
                  }} />
                  <Typography variant="h6" gutterBottom>
                    Tags <sup style={{ color: 'red' }}>*</sup>
                  </Typography>
                  <div className='tagsDiv'>
                    {tagArr.map((a, i) => {
                      return (
                        <div className='tag'>{a}
                          <span onClick={() => {
                            let arr = [...tagArr]
                            arr.splice(i, 1)
                            setTagArr(arr)
                          }}>
                            <Iconify icon={'ic:sharp-cancel'} width={22} height={22} />
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <Input value={tagValue} onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      let arr = [...tagArr]
                      arr.push(e.target.value)
                      setTagValue('')
                      setTagArr(arr)
                    }
                  }} type="text" className="titleInput" onChange={(e) => {
                    setTagValue(e.target.value)
                  }} />
                </div>





              </div>



              <SunEditor
                height="50vh"
                onChange={handleChange}
                setContents={content}
                em
                setOptions={{
                  plugins: plugins,
                  buttonList: [
                    ['undo', 'redo'],
                    ['fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],

                    // '/', // Line break
                    ['horizontalRule', 'list', 'lineHeight'],
                    ['link', 'image' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                    /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                  ],
                }}
              ></SunEditor>
            </div>
          </div>
          <div className="previewDivBlog">
            <Typography variant="h3" guterBottom>
              Preview
            </Typography>
            <div id="blogRef"></div>
          </div>
        </div>

        <LoadingButton fullWidth size="large" variant="contained" loading={blogLoader} onClick={submit}>
          Add Blog
        </LoadingButton>
      </Container>
    </Page>
  );
}
