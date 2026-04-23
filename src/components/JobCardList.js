import { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Button,
  Typography,
  Pagination,
} from '@mui/material';
import { PersonOutlined, ImportContacts, CurrencyBitcoin } from '@mui/icons-material';
import CustomDialog from './CustomDialog';
import SearchForm from './SearchForm';

function getPageSize() {
  return window.innerWidth >= 1440 ? 6 : 4;
}

function getLabelById(items, id) {
  const target = items.find((item) => String(item.id) === String(id));
  return target ? target.label : '未設定';
}

export default function JobCardList() {
  const [jobs, setJobs] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    function handleResize() {
      setPageSize((current) => {
        const next = getPageSize();
        return next;
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);

      try {
        const [educationResponse, salaryResponse] = await Promise.all([
          fetch('/api/v1/educationLevelList'),
          fetch('/api/v1/salaryLevelList'),
        ]);

        const [educationData, salaryData] = await Promise.all([
          educationResponse.json(),
          salaryResponse.json(),
        ]);

        setEducationOptions(educationData);
        setSalaryOptions(salaryData);
      } catch (err) {
        setEducationOptions([]);
        setSalaryOptions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const openDialog = (id) => {
    setOpen(true);
    setSelectedJobId(id);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const pagesCount = () => {
    return Math.ceil(totalData / pageSize);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className="p-4 xl:p-6 grid gap-3 xl:gap-5 border-gray-500 bg-gray-100 !rounded-none xl:!rounded-xl !shadow-floating">
        <CardContent
          sx={{ padding: 0 }}
          className="card-title text-body-4 xl:text-body-5 font-bold text-gray-1000"
        >
          適合前端工程師的好工作
        </CardContent>

        <CardContent sx={{ padding: 0 }} className="hidden xl:block">
          <SearchForm
            eduOptions={educationOptions}
            salaryOptions={salaryOptions}
            setJobs={setJobs}
            page={page}
            setPage={setPage}
            setTotalData={setTotalData}
            pageSize={pageSize}
            setLoading={setLoading}
          />
        </CardContent>

        {loading ? (
          <Box className="flex min-h-[260px] items-center justify-center">
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {pagesCount() < 1 && (
              <div className="h-[458px] flex justify-center items-center border rounded-md border-gray-500">
                <div className="text-body-3 font-regular text-gray-700">無資料</div>
              </div>
            )}

            <Box className="grid gap-[10px] xl:gap-[18px] md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="border border-gray-500 rounded-md"
                  sx={{
                    maxWidth: 433,
                    minWidth: 343,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 0 8px rgba(0, 0, 0, 0.35)',
                    },
                  }}
                >
                  <CardContent className="!pb-4">
                    <div className="flex flex-col justify-between gap-2 xl:gap-[10px]">
                      <div className="text-body-3 xl:text-body-5 font-bold">{job.companyName}</div>

                      <div className="flex flex-col gap-2 text-body-2 font-regular text-gray-800">
                        <div className="flex gap-[6px] items-center">
                          <PersonOutlined sx={{ fontSize: 18 }} />
                          {job.jobTitle}
                        </div>

                        <div className="flex gap-[6px] items-center">
                          <ImportContacts sx={{ fontSize: 18 }} />
                          學歷
                          <Chip
                            size="small"
                            color="primary"
                            label={getLabelById(educationOptions, job.educationId)}
                          />
                        </div>

                        <div className="flex gap-[6px] items-center">
                          <CurrencyBitcoin sx={{ fontSize: 18 }} />
                          薪水範圍
                          <Chip
                            size="small"
                            color="primary"
                            label={getLabelById(salaryOptions, job.salaryId)}
                          />
                        </div>
                      </div>

                      <Typography className="!text-body-2 font-regular text-gray-1000 line-clamp-2 h-[40px]">
                        {job.preview}
                      </Typography>

                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => openDialog(job.id)}
                          className="!text-body-2 font-bold"
                          size="small"
                          sx={{ height: 18, color: '#ee8927' }}
                        >
                          查看細節
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Box>
            {pagesCount() > 0 && (
              <div className="flex justify-center mt-3">
                <Pagination count={pagesCount()} page={page} onChange={handleChange} />
              </div>
            )}
          </div>
        )}
      </Card>

      <CustomDialog jobId={selectedJobId} open={open} onClose={handleClose} />
    </>
  );
}
