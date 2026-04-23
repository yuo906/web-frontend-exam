import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageViewer from './imageViewer';

export default function CustomDialog(props) {
  const { onClose, jobId, open } = props;
  const [jobdetail, setJobDetail] = useState(null);

  useEffect(() => {
    async function getJobDetail() {
      try {
        const res = await fetch(`/api/v1/jobs/${jobId}`);
        const data = await res.json();

        setJobDetail(data);
      } catch (err) {
        setJobDetail({});
      }
    }

    getJobDetail();
  }, [jobId]);

  function wrapHtml(html = '') {
    return html
      .replace(/<h1>(.*?)<\/h1>/g, '<h1>【$1】</h1>')
      .replace(/<h2>(.*?)<\/h2>/g, '<h2>【$1】</h2>')
      .replace(/<li>/g, '<li>- ')
      .replace(/<br\s*\/?>/g, '<br />-');
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: 'calc(100% - 44px)',
          maxWidth: 750,
        },
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className="!text-body-4 xl:!text-body-5 font-bold text-gray-1000 !px-4 xl:!px-6">
        詳細資訊
      </DialogTitle>

      {jobdetail && (
        <DialogContent
          dividers
          className="flex flex-col gap-3 xl:gap-[18px] h-[661px] !px-4 xl:!px-6 xl:!py-5"
        >
          <div className="flex flex-col xl:flex-row gap-1 xl:gap-2 items-start xl:items-center">
            <div className="text-body-4 xl:text-body-5 font-bold text-gray-1000">
              {jobdetail.companyName}
            </div>
            <div className="text-body-2 xl:text-body-4 font-regular text-gray-1100">
              {jobdetail.jobTitle}
            </div>
          </div>

          <ImageViewer images={jobdetail.companyPhoto} />

          <div>
            <div className="text-body-3 font-bold text-gray-1000 mb-2">工作內容</div>
            <div
              className="text-body-3 font-regular text-gray-800 flex flex-col gap-4"
              dangerouslySetInnerHTML={{ __html: wrapHtml(jobdetail.description) }}
            ></div>
          </div>
        </DialogContent>
      )}

      <DialogActions>
        <Button
          sx={{ color: '#4D4D4D', p: 2, fontSize: 15, padding: 0 }}
          style={{ padding: '4px 11px', letterSpacing: '0.46px', lineHeight: '26px' }}
          className="xl:!text-body-3 !font-regular xl:!tracking-normal"
          onClick={handleClose}
        >
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}
