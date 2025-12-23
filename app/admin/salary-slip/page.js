'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './salary-slip.module.css';

export default function SalarySlipGenerator() {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState({
        empName: '',
        empId: '',
        designation: '',
        month: 'December 2024',
        department: '',
        bankAccount: 'XXXX-XXXX-1234',

        // Earnings
        basic: 45000,
        hra: 22500,
        conveyance: 1600,
        special: 5000,
        medical: 1250,

        // Deductions
        pf: 1800,
        tax: 2500,
        loan: 0
    });

    useEffect(() => {
        const name = searchParams.get('name');
        const role = searchParams.get('role');
        const dept = searchParams.get('dept');
        const id = searchParams.get('id');

        if (name) {
            setFormData(prev => ({
                ...prev,
                empName: name || 'John Doe',
                designation: role || 'Software Engineer',
                department: dept || 'Engineering',
                empId: id || 'LB-2024-001'
            }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'empName' || name === 'empId' || name === 'designation' || name === 'month' || name === 'department' || name === 'bankAccount'
                ? value
                : Number(value)
        }));
    };

    const calculateTotal = () => {
        const totalEarnings = formData.basic + formData.hra + formData.conveyance + formData.special + formData.medical;
        const totalDeductions = formData.pf + formData.tax + formData.loan;
        const netSalary = totalEarnings - totalDeductions;
        return { totalEarnings, totalDeductions, netSalary };
    };

    const totals = calculateTotal();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            {/* LEFT: Editor Form */}
            <div className={styles.editorSection}>
                <h2 className={styles.sectionTitle}>Employee Details</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Employee Name</label>
                    <input name="empName" value={formData.empName} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Emp ID</label>
                        <input name="empId" value={formData.empId} onChange={handleChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Month/Year</label>
                        <input name="month" value={formData.month} onChange={handleChange} className={styles.input} />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Designation</label>
                    <input name="designation" value={formData.designation} onChange={handleChange} className={styles.input} />
                </div>

                <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Earnings</h2>
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Basic Salary</label>
                        <input type="number" name="basic" value={formData.basic} onChange={handleChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>HRA</label>
                        <input type="number" name="hra" value={formData.hra} onChange={handleChange} className={styles.input} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Special Allow.</label>
                        <input type="number" name="special" value={formData.special} onChange={handleChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Conveyance</label>
                        <input type="number" name="conveyance" value={formData.conveyance} onChange={handleChange} className={styles.input} />
                    </div>
                </div>

                <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Deductions</h2>
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Provident Fund</label>
                        <input type="number" name="pf" value={formData.pf} onChange={handleChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Income Tax</label>
                        <input type="number" name="tax" value={formData.tax} onChange={handleChange} className={styles.input} />
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button onClick={handlePrint} className={styles.printBtn}>Download PDF / Print</button>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            onClick={() => {
                                const text = `Salary Slip for ${formData.empName} (${formData.month}) is ready. Net Pay: ₹${totals.netSalary}`;
                                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className={styles.shareBtn}
                            style={{ background: '#25D366' }}
                        >
                            Share on WhatsApp
                        </button>
                        <button
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({
                                            title: 'Salary Slip',
                                            text: `Salary Slip for ${formData.empName}`,
                                            url: window.location.href
                                        });
                                    } catch (err) { }
                                } else {
                                    alert("Sharing not supported on this browser context.");
                                }
                            }}
                            className={styles.shareBtn}
                            style={{ background: '#3b82f6' }}
                        >
                            Share Link
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Live Preview (A4) */}
            <div className={styles.previewSection}>
                <div className={styles.salarySlip}>
                    <div className={styles.watermark}>LOGICBITE</div>

                    <div className={styles.companyHeader}>
                        {/* Real Company Logo & Branding */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                            <img src="/company_logo.png" alt="LogicBite Infotech" style={{ height: '70px', marginBottom: '8px' }} />
                            <h1 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'Impact, sans-serif', color: '#111827', textTransform: 'uppercase', letterSpacing: '1px' }}>LOGICBITE INFOTECH PVT LTD</h1>
                        </div>

                        <div className={styles.companyAddress}>
                            Mirzapur, India<br />
                            <b>CIN:</b> U62099UP2025OPC229455 | <b>Email:</b> logicbite25@gmail.com<br />
                            <b>Phone:</b> +91 9026181492 | <b>Web:</b> www.logicbite.com
                        </div>
                    </div>

                    <div className={styles.slipTitle}>Payslip for the month of {formData.month}</div>

                    <div className={styles.empDetails}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Name:</span>
                            <span className={styles.detailValue}>{formData.empName}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Designation:</span>
                            <span className={styles.detailValue}>{formData.designation}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Employee ID:</span>
                            <span className={styles.detailValue}>{formData.empId}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Department:</span>
                            <span className={styles.detailValue}>{formData.department}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Bank Acc:</span>
                            <span className={styles.detailValue}>{formData.bankAccount}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Days Worked:</span>
                            <span className={styles.detailValue}>30</span>
                        </div>
                    </div>

                    <table className={styles.salaryTable}>
                        <thead>
                            <tr>
                                <th>Earnings</th>
                                <th className={styles.amountCol}>Amount (₹)</th>
                                <th>Deductions</th>
                                <th className={styles.amountCol}>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Salary</td>
                                <td className={styles.amountCol}>{formData.basic.toLocaleString()}</td>
                                <td>Provident Fund</td>
                                <td className={styles.amountCol}>{formData.pf.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>House Rent Allowance</td>
                                <td className={styles.amountCol}>{formData.hra.toLocaleString()}</td>
                                <td>Professional Tax / IT</td>
                                <td className={styles.amountCol}>{formData.tax.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Conveyance</td>
                                <td className={styles.amountCol}>{formData.conveyance.toLocaleString()}</td>
                                <td>Loan Recovery</td>
                                <td className={styles.amountCol}>{formData.loan > 0 ? formData.loan.toLocaleString() : '-'}</td>
                            </tr>
                            <tr>
                                <td>Special Allowance</td>
                                <td className={styles.amountCol}>{formData.special.toLocaleString()}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Medical Allowance</td>
                                <td className={styles.amountCol}>{formData.medical.toLocaleString()}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className={styles.totalRow}>
                                <td>Total Earnings</td>
                                <td className={styles.amountCol}>{totals.totalEarnings.toLocaleString()}</td>
                                <td>Total Deductions</td>
                                <td className={styles.amountCol}>{totals.totalDeductions.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.netSalary}>
                        NET PAYABLE: ₹ {totals.netSalary.toLocaleString()}/-
                        <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '5px' }}>
                            (Rupees {converter(totals.netSalary)} Only)
                        </div>
                    </div>

                    {/* Footer Removed as requested */}
                    <div className={styles.note} style={{ marginTop: '2rem' }}>
                        This is a computer-generated document.
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple Number to Words converter for the demo
// Number to Words Converter
function converter(amount) {
    if (!amount) return "Zero";

    const words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';

    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
