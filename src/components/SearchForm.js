import { FormControl, InputLabel, MenuItem, Select, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SearchForm(props) {
  const { eduOptions, salaryOptions, setJobs, page, setPage, setTotalData, pageSize, setLoading } =
    props;
  const [filters, setFilters] = useState({
    companyName: '',
    educationLevel: '',
    salaryLevel: '',
  });

  function handleFilterChange(field) {
    return (event) => {
      setFilters((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };
  }

  function handleSearch() {
    setPage(1);
    loadJobs();
  }

  async function loadJobs() {
    setLoading(true);

    try {
      const searchParams = new URLSearchParams({
        pre_page: String(pageSize),
        page: page,
      });

      if (filters.companyName.trim()) {
        searchParams.set('company_name', filters.companyName.trim());
      }

      if (filters.educationLevel) {
        searchParams.set('education_level', filters.educationLevel);
      }

      if (filters.salaryLevel) {
        searchParams.set('salary_level', filters.salaryLevel);
      }

      const response = await fetch(`/api/v1/jobs?${searchParams.toString()}`);
      const result = await response.json();

      setJobs(result.data || []);
      setTotalData(result.total);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, [page, pageSize]);

  return (
    <>
      <div className="flex gap-[18px]">
        <FormControl size="medium" variant="outlined" className="w-[647px] ">
          <TextField
            id="company-name"
            label="公司名稱"
            placeholder="請輸入公司名稱"
            value={filters.companyName}
            onChange={handleFilterChange('companyName')}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiInputBase-input::placeholder': {
                color: '#4D4D4D',
                opacity: 1,
              },
            }}
          />
        </FormControl>

        <FormControl size="medium" variant="outlined" className="flex-1">
          <InputLabel shrink id="education-level-label" className="bg-[#fff] !px-1.5">
            教育程度
          </InputLabel>
          <Select
            labelId="education-level-label"
            label="教育程度"
            displayEmpty
            value={filters.educationLevel}
            onChange={handleFilterChange('educationLevel')}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value="">不限</MenuItem>
            {eduOptions.map((item) => (
              <MenuItem key={item.id} value={String(item.id)}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="medium" variant="outlined" className="flex-1">
          <InputLabel shrink id="salary-level-label" className="bg-[#fff] !px-1.5">
            薪水範圍
          </InputLabel>
          <Select
            labelId="salary-level-label"
            label="薪水範圍"
            displayEmpty
            value={filters.salaryLevel}
            onChange={handleFilterChange('salaryLevel')}
          >
            <MenuItem value="">不限</MenuItem>
            {salaryOptions.map((item) => (
              <MenuItem key={item.id} value={String(item.id)}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="grey"
          sx={{ color: '#ffffff' }}
          onClick={handleSearch}
          className="flex-none !text-body-3 !font-regular"
        >
          查詢條件
        </Button>
      </div>
    </>
  );
}
