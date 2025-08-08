import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  card: css`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 1rem;
  `,
  checkInButton: css`
    background-color: #292966;
    border-color: #292966;
    &:hover {
      background-color: #5c5c99 !important;
      border-color: #5c5c99 !important;
    }
  `,
  // Medical History Page Styles
  medicalHistoryTitle: css`
    color: #292966;
    margin-bottom: 24px;
    font-weight: 600;
  `,
  medicalHistoryTable: css`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    
    .ant-table-thead > tr > th {
      background-color: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
      font-weight: 600;
      color: #495057;
    }
    
    .ant-table-tbody > tr:hover > td {
      background-color: #f8f9fa;
    }
    
    .ant-table-tbody > tr > td {
      padding: 16px;
    }
  `,
  viewHistoryLink: css`
    color: #292966;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      color: #5c5c99;
      text-decoration: underline;
    }
  `,
  medicalHistoryModal: css`
    .ant-modal-header {
      background: linear-gradient(135deg, #292966 0%, #5c5c99 100%);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      
      .ant-modal-title {
        color: white;
        font-weight: 600;
      }
    }
    
    .ant-modal-content {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .ant-modal-body {
      padding: 24px;
      
      p {
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 1.6;
        
        strong {
          color: #292966;
          font-weight: 600;
          margin-right: 8px;
        }
      }
      
      .ant-spin {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 120px;
      }
    }
  `,
  noHistoryMessage: css`
    text-align: center;
    color: #6c757d;
    font-style: italic;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 2px dashed #dee2e6;
  `,
  // Profile Modal Styles
  profileModal: css`
    .ant-modal-header {
      background: linear-gradient(135deg, #292966 0%, #5c5c99 100%);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      
      .ant-modal-title {
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        
        .anticon {
          font-size: 18px;
        }
      }
    }
    
    .ant-modal-content {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .ant-modal-body {
      padding: 24px;
    }
    
    .ant-modal-footer {
      border-top: 1px solid #e9ecef;
      padding: 16px 24px;
      text-align: right;
      
      .ant-btn {
        border-radius: 6px;
        font-weight: 500;
      }
    }
  `,
  profileCard: css`
    border: none;
    box-shadow: none;
    
    .ant-descriptions {
      .ant-descriptions-item-label {
        background-color: #f8f9fa;
        color: #292966;
        font-weight: 600;
        width: 35%;
      }
      
      .ant-descriptions-item-content {
        background-color: white;
        color: #495057;
        font-weight: 400;
      }
      
      .ant-descriptions-row:not(:last-child) {
        border-bottom: 1px solid #e9ecef;
      }
    }
  `,
  profileLoadingContainer: css`
    text-align: center;
    padding: 40px 0;
    
    .ant-spin {
      margin-bottom: 16px;
    }
    
    p {
      color: #6c757d;
      margin: 0;
      font-size: 14px;
    }
  `,
  profileErrorAlert: css`
    border-radius: 8px;
    
    .ant-alert-message {
      color: #721c24;
      font-weight: 600;
    }
    
    .ant-alert-description {
      color: #856404;
    }
    
    .ant-btn {
      border-radius: 4px;
      font-weight: 500;
    }
  `,
  profileInfoAlert: css`
    border-radius: 8px;
    background-color: #d1ecf1;
    border-color: #b8daff;
    
    .ant-alert-message {
      color: #0c5460;
      font-weight: 600;
    }
    
    .ant-alert-description {
      color: #0c5460;
    }
  `,
  // General Modal Enhancement
  modalOverlay: css`
    .ant-modal-mask {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
    }
  `,
  // Status Tags
  completedTag: css`
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 6px;
    font-weight: 500;
  `,
  // Table Enhancements
  tableContainer: css`
    .ant-table-pagination {
      margin: 24px 0 0 0;
      
      .ant-pagination-item {
        border-radius: 6px;
        
        &.ant-pagination-item-active {
          background-color: #292966;
          border-color: #292966;
          
          a {
            color: white;
          }
        }
      }
      
      .ant-pagination-next,
      .ant-pagination-prev {
        border-radius: 6px;
        
        &:hover {
          border-color: #292966;
          color: #292966;
        }
      }
    }
  `
}));