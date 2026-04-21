import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ImageViewer from './ImageViewer';

export default function CustomDialog(props) {
  const { onClose, jobId, open } = props;
  const [jobdetail, setJobDetail] = useState(null);

  useEffect(() => {
    async function getJobDetail() {
      try {
        const res = await fetch(`/api/v1/jobs/${jobId}`);
        const data = await res.json();
        console.log(data);

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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-body-4 font-bold text-gray-1000">詳細資訊</DialogTitle>

      {jobdetail && (
        <DialogContent dividers>
          <Typography gutterBottom sx={{ py: 1 }}>
            <div className="text-body-4 font-bold text-gray-1000">{jobdetail.companyName}</div>
            <div className="text-body-2 font-regular text-gray-1100">{jobdetail.jobTitle}</div>
          </Typography>

          <ImageViewer images={jobdetail.companyPhoto} />

          <Typography gutterBottom sx={{ py: 1 }}>
            <div className="text-body-3 font-bold text-gray-1000 pb-2">工作內容</div>
            <div
              className="text-body-3 font-regular text-gray-800 flex flex-col gap-4"
              dangerouslySetInnerHTML={{ __html: wrapHtml(jobdetail.description) }}
            ></div>
          </Typography>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleClose} size="" sx={{ color: '#4D4D4D' }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}
