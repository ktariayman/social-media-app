
function CreateStoryImagePreview({ imageInputRef, openImagesHandler, text, user, setText, images, setImages, setShowPrev, setError, textRef, setPicker, picker, backgroundImages, imageHandler }: any) {
  const handleImages = (e: any, backgroundImages?: string[]) => {
    let files = Array.from(e.target.files);
    files.forEach((img: any) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        setError(`${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`);
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent: any) => {
          if (backgroundImages !== undefined) {
            setImages(() => [...backgroundImages, readerEvent.target.result]);
            return
          }
          setImages((images: any) => [...images, readerEvent.target.result]);

        };
      }
    });
  };
  return (
    <div className=''>
      <input
        type='file'
        accept='image/jpeg,image/png,image/webp,image/gif'
        hidden
        ref={imageInputRef}
        onChange={handleImages}
      />
      {images && images.length ? (
        <div className='add_pics_inside1 p0' >
          <div className='preview_actions'>
            <button className='hover1'>
              <i className='edit_icon'></i>
              Edit
            </button>
            <button
              className='hover1'
              onClick={openImagesHandler}
            >
              <i className='addPhoto_icon'></i>
              Add Photos/Videos
            </button>
          </div>
          <div
            className='small_white_circle'
            onClick={() => {
              setImages([]);
            }}
          >
            <i className='exit_icon'></i>
          </div>
          <div
            className={'preview1'}
          >
            <img src={images[0]} alt='' />
          </div>
        </div>
      ) : (
        <div className='add_pics_inside1 ' style={{ height: '300px' }}>
          <i className='create_story_bg'>
            <div
              className='add_col'
              onClick={openImagesHandler}
            >
              <div className='add_circle'>
                <i className='addPhoto_icon'></i>
              </div>
              <span>Create your story with photos</span>
            </div>
          </i>
        </div>

      )}
    </div >
  );
}

export default CreateStoryImagePreview;
